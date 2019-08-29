/// <reference types="Cypress" />
import gql from 'graphql-tag';

const SUBJECTS = [
  {
    threadId: 'store_only'
  },
  {
    threadId: 'member_specific_1_2'
  }
];

import get from 'lodash/get';

describe('check seed data', function() {
  before(() => {
    cy.getClient().then(async client => {
      const threadIds = SUBJECTS.map(s => s.threadId);
      const res = await client.query({
        query: gql`
        {
          ${threadIds.map(
            (tId, ii) => `
            c_${ii}:commentByThreadId(threadCommentThreadId:"${tId}", limit:20){
              items{
                id
              }
            }
          `
          ).join(`
          `)}
        }
        `
      });
      console.log('>>Utils/thread.spec::', 'res', res); //TRACE
      let delMutation = '';
      Object.values(res.data).forEach((d, ii) => {
        get(d, 'items', []).forEach((c, jj) => {
          delMutation += `
            d_${ii}_${jj}: deleteThreadComment(input:{id:"${c.id}"}){
              id
            }
          `;
        });
      });
      threadIds.forEach((tId, ii) => {
        delMutation += `
            ds_${ii}: deleteThread(input:{id:"${tId}"}){
              id
            }
          `;
      });
      await client.mutate({
        mutation: gql`
        mutation{
          ${delMutation}
        }
      `,
        errorPolicy: 'ignore'
      });
      // throw 'shit';
      //delete all thread data
    });
  });
  beforeEach(function() {
    cy.visit('/thread');
    cy.get('div[role="progressbar"]').should('be.visible');
    cy.get('#amr-thread-test-subjects')
      .type(' ')
      .then(function(el) {
        el.val(JSON.stringify(SUBJECTS));
      });
    cy.contains('button', 'Set').click();
  });

  it('should accept string subjects', async () => {
    cy.visit('/thread');
    cy.get('div[role="progressbar"]').should('be.visible');
    cy.get('#amr-thread-test-subjects')
      .type(' ')
      .then(function(el) {
        el.val(JSON.stringify(SUBJECTS.map(s => s.threadId)));
      });
    cy.contains('button', 'Set').click();
    cy.get('[data-testid="amr-thread-input"] textarea').should('be.visible');
  });

  it('should be able to submit comment', function() {
    const mainSubject = SUBJECTS[0].threadId;
    for (let index = 0; index < 6; index++) {
      const testComment = 'hello ' + index;
      cy.get('[data-testid="amr-thread-input"] textarea').should('be.visible');
      cy.get('#amr-thread-input').type(testComment);
      cy.contains('button', 'Submit ✔').click();
      cy.contains('nav[role="thread-comment-list"] div', `"body":"${testComment}"`);
      cy.contains('nav[role="thread-comment-list"] div', `"id":"${mainSubject}::`);
      cy.contains('button', 'Submit ✔').should('have.attr', 'disabled');
    }
  });
  it('"beforeSubmit" should be able to pospone submission', function() {
    const testComment = 'should not pass w w q w w qw q w w qw wqwq wq ';
    cy.contains('button', /Allow Submit/).click();
    cy.get('[data-testid="amr-thread-input"] textarea').should('be.visible');
    cy.get('#amr-thread-input').type(testComment);
    cy.contains('button', 'Submit ✔').click();
    cy.contains('button', 'Please wait 🕕');
    cy.contains('button', 'Submit ✔');
    cy.contains('nav[role="thread-comment-list"] div', `"body":"${testComment}"`, {
      timeout: 1000
    }).should('not.exist');
  });
  it('"show more" should display more data in chronological order 😎', function() {
    cy.contains('button', 'Please wait 🕕').should('have.attr', 'disabled');
    cy.contains('button', 'Submit ✔').should('have.attr', 'disabled');
    cy.get('nav[role="thread-comment-list"] div').then(function(list) {
      expect(list).to.have.length(5);
    });
    cy.contains('button', 'Show More').click();
    cy.contains('button', 'Please wait 🕕').should('have.attr', 'disabled');
    cy.contains('button', 'Submit ✔').should('have.attr', 'disabled');
    cy.get('nav[role="thread-comment-list"] div').then(function(list) {
      expect(list).to.have.length(6);
      let prevDate = Date.now();
      list.each(function() {
        const commentJson = JSON.parse(this.textContent);
        const commentDate = new Date(commentJson.createdAt).getTime();
        expect(commentDate).to.be.lt(prevDate);
        prevDate = commentDate;
      });
    });
  });
});
