import MenuLoggedIn from './MenuLoggedIn'

export default {
  title: 'Header/MenuLoggedIn',
  component: MenuLoggedIn,
}

const Template = (arguments_) => <MenuLoggedIn {...arguments_} />

export const MenuLoggedInComponent = Template.bind({})
MenuLoggedInComponent.args = {
  classes: '',
}
