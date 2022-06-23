import { useLayoutContext } from '@context/layoutContext';

export default function TotalPageDiv({ children }: any) {
  const { headerSearchIsExpanded, setHeaderSearchIsExpanded } =
    useLayoutContext();

  return (
    <div
      className="row-flex-1"
      onClick={(e) => {
        e.target.id.includes('header-search')
          ? setHeaderSearchIsExpanded(true)
          : setHeaderSearchIsExpanded(false);
      }}
    >
      {children}
    </div>
  );
}
