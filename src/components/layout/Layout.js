import { Fragment } from 'react'
import classes from './Layout.module.css'
import MainNavigation from './MainNavigation'

function Layout(props) {        //Wrapper for navbar and other components
    return (
        <Fragment>
            <MainNavigation />
            <main className={classes.main}>{props.children}</main>
        </Fragment>
    )
}

export default Layout