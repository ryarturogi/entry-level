import MenuLoggedIn from './MenuLoggedIn';

const Menu = {
  component: MenuLoggedIn,
  title: 'Header/MenuLoggedIn',
};

function Template(arguments_) {
  return <MenuLoggedIn {...arguments_} />;
}

export const MenuLoggedInComponent = Template.bind({});
MenuLoggedInComponent.args = {
  classes: '',
};

export default Menu;
