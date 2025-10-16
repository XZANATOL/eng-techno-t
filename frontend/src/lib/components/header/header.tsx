import Image from "next/image"

import "./header.css"

export default function Header(){
	const date = new Date();
	const formattedDate = date.toLocaleString('en-US', {
	  weekday: 'short', // 'Tue'
	  month: 'long',    // 'April'
	  day: 'numeric'    // '8'
	});

	return (
		<div className="header">
			<div className="brand-warpper">
				<Image src="/public/Logo-brand.png" alt="brand-logo" fill />
				<div className="d-none d-lg-block vertical-line"></div>
				<span className="d-none d-lg-block ">
					The best for you to hear, always
				</span>
			</div>

			<div className="d-flex align-items-center">
				<span>
					{formattedDate}
				</span>
			</div>
		</div>
	)
}