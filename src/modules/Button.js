import React from "react";
import Button from "@material-ui/core/Button";

export default function(props) {
  React.useEffect(() => {
    console.log(">>src/Button::", "test"); //TRACE
  }, []);
  return <Button>hello 2</Button>;
}
