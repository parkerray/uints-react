import { useEnsName } from 'wagmi';

function Holder({address, number}) {

  const { data, isError, isFetching } = useEnsName({ address });

  const shortAddress = (addy) => {
    const prefix = addy.slice(0, 4);
    const suffix = addy.slice(-3);
    return `${prefix}...${suffix}`;
  }

  return (
    <div className='list-item'>
      <p>{number}</p>
      <p>{data != undefined ? data : shortAddress(address)}</p>
    </div>
  );
}

export default Holder;
