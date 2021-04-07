import { Button } from '@material-ui/core'
import React from 'react'
import SocialLogin from 'react-social-login'

type SocialProps = {
  children: React.ReactChildren
  triggerLogin: any
}

class SocialButton extends React.Component<SocialProps> {
  render() {
    const { children, triggerLogin, ...props } = this.props
    return (
      <Button
        type="submit"
        variant="contained"
        color="primary"
        onClick={triggerLogin}
        {...props}
      >
        {children}
      </Button>
    )
  }
}

export default SocialLogin(SocialButton)
