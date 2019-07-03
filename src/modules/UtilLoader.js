import React from "react";
import Alerts from "./Utils/Alerts";

const defaultUtils = [Alerts];

export default function UtilLoader(props) {
  const { utils = [] } = props;

  const allUtils = React.useMemo(() => {
    return [...defaultUtils, ...utils];
  }, [utils]);

  return (
    <React.Suspense fallback={<div />}>
      {allUtils.map((util, ii) => {
        const UtilComponent = util.default ? util.default : util;
        return <UtilComponent key={ii} />;
      })}
    </React.Suspense>
  );
}
