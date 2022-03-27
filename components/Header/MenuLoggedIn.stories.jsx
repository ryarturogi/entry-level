import MenuLoggedIn from "./MenuLoggedIn";

export default menu = {
  component: MenuLoggedIn,
  title: "Header/MenuLoggedIn"
};

function Template(arguments_) {
  return <MenuLoggedIn {...arguments_} />;
}

export const MenuLoggedInComponent = Template.bind({});
MenuLoggedInComponent.args = {
  classes: ""
};
