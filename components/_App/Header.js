import { Menu, Container, Image, Icon, Segment } from 'semantic-ui-react';
import Link from 'next/link';
import Router, { useRouter } from 'next/router';
import NProgress from 'nprogress'
import { handleLogout } from '../../utils/auth'

Router.onRouteChangeStart = () => NProgress.start();
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();

function Header({user}) {
  const router = useRouter();
  const isRoot = user && user.role === 'root'
  const isAdmin = user && user.role === 'admin'
  const isRootorAdmin = (isRoot || isAdmin)
  const [vertical, setVertical] = React.useState(false)
  const [phoneShow, setPhoneShow] = React.useState(false)

  function isActive(route) {
    return route == router.pathname;
  }

  function handleVertical() {
    setPhoneShow(previousState => !previousState)
  }
  React.useEffect(() => {
    console.log(window.outerWidth)
    if (window.outerWidth < 900) {
      setVertical(true)
      console.log('vertical set')
    } else {
      setVertical(false)
      console.log('horizontal set')
    }
  }, [setVertical])

  return (
    <Menu vertical={vertical} stackable fluid id="menu">
      <Container text>
        {!vertical ? <Link href="/">
          <Menu.Item header active={isActive('/')}>
            <Image
              size="mini"
              src="static/logo.svg"
              style={{marginRight: '1em'}}
            />
            ReactReserve
          </Menu.Item>
  
        </Link>
        :
      
        <>
        <Menu.Item header onClick={handleVertical}>
            <Icon
              name="bars"
              size="large"
            />
            
          </Menu.Item>
        </>}  
        
        { (phoneShow || !vertical) &&
          <>
          { vertical ? 
          <Link href="/">
          <Menu.Item header active={isActive('/')}>
            <Icon
              name="home"
              size="large"
            />
            Products
          </Menu.Item>
        </Link> : <></>
          }
        <Link href="/cart">
          <Menu.Item header active={isActive('/cart')}>
            <Icon
              name="cart"
              size="large"
            />
            Cart
          </Menu.Item>
        </Link>

        {isRootorAdmin && (<Link href="/create">
          <Menu.Item header active={isActive('/create')}>
            <Icon
              name="add square"
              size="large"
            />
            Create
          </Menu.Item>
        </Link>
        )}

        {user ? (
        <>
        <Link href="/account">
          <Menu.Item header active={isActive('/account')}>
            <Icon
              name="user"
              size="large"
            />
            Account
          </Menu.Item>
        </Link>

        <Menu.Item onClick={handleLogout} header>
          <Icon
            name="sign out"
            size="large"
          />
          Logout
        </Menu.Item>
        </>

        ):
        
        (<>
        <Link href="/login">
          <Menu.Item header active={isActive('/login')}>
            <Icon
              name="sign in"
              size="large"
            />
            Login
          </Menu.Item>
        </Link>

        <Link href="/signup">
          <Menu.Item header active={isActive('/signup')}>
            <Icon
              name="signup"
              size="large"
            />
            Signup
          </Menu.Item>
        </Link>    
        </>
        )}
        
      </>
      }

      </Container>
    </Menu>
  )
}

export default Header;
