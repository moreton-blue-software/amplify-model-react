/// <reference types="Cypress" />
import nanoid from 'nanoid';
import Promise from 'bluebird';
import gql from 'graphql-tag';
import get from 'lodash/get';

let savedVacancy;
const vacSample = {
  position: 'test-vacancy-id'
};

describe('check seed data', async () => {
  before(function() {
    cy.getClient().then(async function(client) {
      const res = await client.query({
        query: gql`
          query {
            listVacancys(limit: 100) {
              items {
                id
              }
            }
          }
        `,
        fetchPolicy: 'network-only'
      });
      console.log('>>integration/modelForm.spec::', 'res', res); //TRACE
      let deleteQ = '';
      get(res, 'data.listVacancys.items', []).forEach(function(v, ii) {
        deleteQ += `
          d_${ii}: deleteVacancy(input: {id: "${v.id}"}){
            id
          }
        `;
      });
      if (!deleteQ.length) return;
      await client.mutate({
        mutation: gql`
          mutation {
            ${deleteQ}
          }
        `
      });
      console.log('>>integration/modelForm.spec::', 'deleteQ', deleteQ); //TRACE
    });
  });
  it('save form', function() {
    cy.visit('/');
    cy.get('input[id="position"]').type(vacSample.position, { delay: 100 });
    cy.contains('label', 'Start Date')
      .parent()
      .click();
    cy.get('div[role="dialog"]').within(function() {
      cy.contains('button', 'OK').click();
    });
    cy.fixture('small.webm', 'base64').then(function(fileContent) {
      cy.get('input[type="file"]').each(function(d) {
        cy.wrap(d).upload({
          fileContent,
          fileName: nanoid(),
          mimeType: 'video/webm',
          encoding: 'binary'
        });
      });
    });
    cy.root()
      .contains('button', 'Create')
      .click();
    cy.get('div[role="dialog"]')
      .contains('button', 'OK')
      .click();
    //wait for form to save
    cy.contains('button', 'Update');
    cy.getClient().then(async function(client) {
      const res = await client.query({
        query: LIST_VACANCYS,
        fetchPolicy: 'network-only'
      });
      savedVacancy = get(res, 'data.listVacancys.items.0');
      expect(savedVacancy.position).eq(vacSample.position);
      expect(savedVacancy.startDate).to.exist;
      expect(savedVacancy.video.filename).to.exist;
    });
  });
  it('update form', function() {
    expect(savedVacancy.id).to.exist;
    const changedPosition = 'hello';
    cy.contains(`id:${savedVacancy.id}`);
    cy.get('input[id="position"]').then(function(inp) {
      expect(inp.val()).eq(savedVacancy.position);
    });
    cy.get('input[id="position"]').clear();
    cy.get('input[id="position"]').type(changedPosition, { delay: 100 });
    const fileName = 'newn' + nanoid();
    cy.fixture('small.webm', 'base64').then(function(fileContent) {
      cy.get('input[type="file"]').each(function(d) {
        cy.wrap(d).upload({
          fileContent,
          fileName,
          mimeType: 'video/webm',
          encoding: 'binary'
        });
      });
    });
    cy.root()
      .contains('button', 'Update')
      .click();
    cy.get('div[role="dialog"]')
      .contains('button', 'OK')
      .click();
    cy.root()
      .contains('button', 'Update')
      .should('be.disabled');
    cy.root()
      .contains('button', 'Update')
      .should('not.be.disabled');
    cy.getClient().then(async function(client) {
      const res = await client.query({
        query: LIST_VACANCYS,
        fetchPolicy: 'network-only'
      });
      const updatedVacancy = get(res, 'data.listVacancys.items.0');
      expect(updatedVacancy.id).eq(savedVacancy.id);
      expect(updatedVacancy.position).eq(changedPosition);
      expect(updatedVacancy.startDate).to.exist;
      expect(updatedVacancy.video.filename).eq(savedVacancy.id + '/' + fileName);
    });
  });
});

const LIST_VACANCYS = gql`
  query {
    listVacancys {
      items {
        id
        createdAt
        updatedAt
        position
        description
        startDate
        video {
          filename
          uploadDate
          uploader
          hash
        }
        agreements {
          filename
          uploadDate
          uploader
          hash
        }
        questions {
          items {
            id
          }
        }
        client {
          id
          name
        }
        vacancyClientId
      }
    }
  }
`;
