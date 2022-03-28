import Link from 'next/link';

function Button(props) {
  const { href, action, classes, children, ...rest } = props;

  return href ? (
    <Link href={href ? href : '/'} passHref>
      <button className={classes} type="button" {...rest}>
        {children}
      </button>
    </Link>
  ) : (
    <button className={classes} onClick={action} type="button" {...rest}>
      {children}
    </button>
  );
}

export default Button;
