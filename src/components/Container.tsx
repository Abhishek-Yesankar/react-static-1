type Props = {
   children?: JSX.Element | JSX.Element[],
   className?: string,
}
export default function Container( props: Props )  {
   return(
      <div className={`max-w-screen-2xl px-6 md:px-12 py-8 md:py-16 mx-auto${props.className ? ' ' + props.className : ''}`}>
         { props.children }
      </div>
   );
}