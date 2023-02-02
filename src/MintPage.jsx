import MintForm from './MintForm';
import Segments from './Segments';

function MintPage() {

  return (
    <>
			<div className='section-split'>
				<div className='left disable-scroll'>
					<MintForm />
				</div>
				<div className='right disable-scroll'>
					<div className='container disable-scroll'>
						<div className='counter-wrapper'>
							<div className='counter-card'>
								<Segments value={3041} />
								<p className='counter-label'>Minted</p>
							</div>
							<div className='counter-card'>
								<Segments value={32} />
								<p className='counter-label'>Minutes left</p>
							</div>
						</div>
					</div>
				</div>
			</div>
    </>
  );
}

export default MintPage;