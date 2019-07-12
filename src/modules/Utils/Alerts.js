import React, { createProvider } from "reactn";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export const AlertProvider = createProvider({
  confirm: { opened: false }
});

export function useConfirmAsync({ content, title } = {}) {
  const [, setConfirm] = AlertProvider.useGlobal("confirm");

  const fn = React.useCallback((opts = {}) => {
    return new Promise((resolve, reject) => {
      if (AlertProvider.getGlobal().confirm.opened) return;
      setConfirm({
        content,
        title,
        ...opts,
        onOk: contentState => resolve(contentState || true),
        onCancel: () => resolve(false),
        opened: true
      });
    });
  }, []);

  return fn;
}

export function useConfirm({ content, title, onOk, onCancel } = {}) {
  const [confirm, setConfirm] = AlertProvider.useGlobal("confirm");
  const handlers = React.useMemo(() => {
    return {
      open() {
        if (AlertProvider.getGlobal().confirm.opened) return;
        setConfirm({ content, title, onOk, onCancel, opened: true });
      },
      close() {
        setConfirm({ ...AlertProvider.getGlobal().confirm, opened: false });
      }
    };
  }, [content, title, onOk, onCancel]);

  return { ...confirm, ...handlers };
}

export default function Modal(props) {
  const {} = props;
  const {
    opened,
    content: Content,
    title,
    close,
    onOk,
    onCancel
  } = useConfirm();

  const [contentState, setContentState] = React.useState(null);

  React.useEffect(() => {
    if (opened) setContentState(null);
  }, [opened]);

  const handlers = React.useMemo(
    () => ({
      onOk() {
        onOk && onOk(contentState);
        close();
      },
      onCancel() {
        onCancel && onCancel();
        close();
      }
    }),
    [onOk, onCancel, close, contentState]
  );

  const isContentComponent = Content instanceof Function;

  return (
    <Dialog
      open={opened}
      onClose={close}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title || "Alert"}</DialogTitle>
      <DialogContent>
        {isContentComponent ? (
          <Content state={contentState} setState={setContentState} />
        ) : (
          Content
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handlers.onOk} color="primary">
          OK
        </Button>
        <Button onClick={handlers.onCancel} color="primary" autoFocus>
          CANCEL
        </Button>
      </DialogActions>
    </Dialog>
  );
}
