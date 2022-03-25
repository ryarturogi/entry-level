import MenuNotLoggedIn from './MenuNotLoggedIn'

export default {
  title: 'Header/MenuNotLoggedIn',
  component: MenuNotLoggedIn,
}

const Template = (arguments_) => <MenuNotLoggedIn {...arguments_} />

export const MenuNotLoggedInComponent = Template.bind({})
MenuNotLoggedInComponent.args = {
  classes: '',
}
