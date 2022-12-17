type Props = {
   children: JSX.Element,
   className: string,
}
export default function Container( props: Props )  {
    return(
    <div className={`max-w-screen-2xl mx-auto${props.className ? ' ' + props.className : ''}`}>
      { props.children }
    </div>
    )
}