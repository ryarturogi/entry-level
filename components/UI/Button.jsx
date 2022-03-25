import Link from 'next/link'

const Button = (props) => {
  const { href, action, classes, children, ...rest } = props
  return href ? (
    <Link href={href ? href : '/'}>
      <button className={classes} {...rest}>
        {children}
      </button>
    </Link>
  ) : (
    <button onClick={action} className={classes} {...rest}>
      {children}
    </button>
  )
}

export default Button
