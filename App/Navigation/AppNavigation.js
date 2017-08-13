import { StackNavigator, DrawerNavigator } from 'react-navigation'
import * as Colors from './Styles/NavigationStyles'
import FavoriteHotspotsScreen from '../Containers/FavoriteHotspotsScreen'
import { getNavigationOptionsWithAction, getNavBarIcon } from './HeaderBarSettings/navBarSettings'
import DrawerView from './Drawer/DrawerView';
import AllHotspotsListScreen from '../Containers/AllHotspotsListScreen'

/* SCREEN DECLARATIONS */
const screens = [
  {name: 'AllHotspotsListScreen', component: AllHotspotsListScreen},
  {name: 'FavoriteHotspotsScreen', component: FavoriteHotspotsScreen},
]

/* GLOBAL NAVBAR OPTIONS */
const navigationOptions = ({ navigation }) =>
  getNavigationOptionsWithAction(Colors.headerBg, Colors.headerTitleColor, getNavBarIcon(navigation, '#00c583'))

/* App navigation factory */
const navigationFactory = (screens, navigationOptions) => {
  const routesPrefix = {
    STACK: 'STACK'
  }

  const stackRoutes = {}
  const drawerRoutes = {}

  screens.forEach((screen) => {
    let stackScreenRoutesName = `${screen.name}${routesPrefix.STACK}`

    stackRoutes[stackScreenRoutesName] = {screen: screen.component}

    drawerRoutes[screen.name] = {
      name: screen.name,
      screen:
        StackNavigator(stackRoutes,
          { initialRouteName: stackScreenRoutesName, navigationOptions })
    }
  })

  return StackNavigator({
    Drawer: {
      name: 'Drawer',
      screen: DrawerNavigator(drawerRoutes, { contentComponent: DrawerView })
    },
    ...stackRoutes
  }, {
    headerMode: 'none'
  })
}

const PrimaryNav = navigationFactory(screens, navigationOptions)

export default PrimaryNav
