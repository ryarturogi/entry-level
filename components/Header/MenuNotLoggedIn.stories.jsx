import MenuNotLoggedIn from "./MenuNotLoggedIn";

export default menu = {
  component: MenuNotLoggedIn,
  title: "Header/MenuNotLoggedIn"
};

function Template(arguments_) {
  return <MenuNotLoggedIn {...arguments_} />;
}

export const MenuNotLoggedInComponent = Template.bind({});
MenuNotLoggedInComponent.args = {
  classes: ""
};
