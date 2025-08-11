
export const commonStep = [
    "General Information",
    "Review"
];
export const companySteps = ["Company Details", "User Details"];
export const configureSteps =["Location" , "Camera"];
/**
 * Returns an array of steps based on the given tabName.
 *
 * @param {string} tabName - The name of the tab.
 * @return {Array} An array of steps.
 */
function Addstep(tabName ) {
  if(tabName === 'company'){
      return  [...companySteps.slice()]
  }
  else if(tabName === 'configure'){
      return  [...configureSteps.slice()]
  }
  else {
    return [
      ...commonStep.slice(0, 1),
      `${tabName} Configuration`,
      "Tasks (Optional)",
      ...commonStep.slice(1)
    ];
  }
}

export default Addstep;
