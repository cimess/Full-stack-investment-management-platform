




export default function Switch({state}: {state: boolean}) {
    return (
        <div>
         <div className="row">
               <div className="col-sm-5">
                    <button type="button" className={`btn btn-xs btn-toggle ${state ? 'active' : ''}`} data-toggle="button" aria-pressed="false" >
                        <div className="handle"></div>
                    </button>
                </div>



            </div>
        </div>
    )
}
