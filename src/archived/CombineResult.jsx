import Segments from "./Segments"
export default function CombineResult({close, data, error, isError, isSuccess}) {
  return (
    <div className="modal-page">
      <div className="modal-inner">
        <div className="modal-page-close" onClick={close}>X</div>
        {/* <Segments value={99}/> */}
        <div>{data}</div>
      </div>
    </div>
  )
}