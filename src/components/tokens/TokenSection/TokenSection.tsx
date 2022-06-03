import Card from '@components/common/Card';
import TokenGeneral from '@components/tokens/components/TokenGeneral';

export default function TokenSection({ props }) {
  return (
    <>
      <div className="content-area">
        <TokenGeneral props={props} />
        <Card></Card>
      </div>
    </>
  );
}
