import React from "react";
import { translate } from "react-i18next";

const ChangeLanguage = ({ i18n }) => {
  return (
    <div>
      <button onClick={() => i18n.changeLanguage("vi")}>vi</button>
      <button onClick={() => i18n.changeLanguage("en")}>en</button>
    </div>
  );
};

// extended main view with translate hoc
export default translate("translations")(ChangeLanguage);
