import { useLayoutContext } from "@context/layoutContext";

export default function NonNavDiv({ children }: any) {
    const { navIsExpanded, setNavIsExpanded } = useLayoutContext();

    return (
        <div
            className="col-flex-1"
            onClick={(e) => {
                navIsExpanded ? setNavIsExpanded(false) : null;
            }}
        >
            {children}
        </div>
    );
}
