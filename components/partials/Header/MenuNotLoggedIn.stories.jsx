import MenuNotLoggedIn from './MenuNotLoggedIn';

const Menu = {
  component: MenuNotLoggedIn,
  title: 'Header/MenuNotLoggedIn',
};

function Template(arguments_) {
  return <MenuNotLoggedIn {...arguments_} />;
}

export const MenuNotLoggedInComponent = Template.bind({});
MenuNotLoggedInComponent.args = {
  classes: '',
};

export default Menu;
