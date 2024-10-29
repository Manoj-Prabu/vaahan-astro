import React, { useRef, useState } from "react";

function Container() {
	const [value, setValue] = useState({ total: 0, status: '' });
	const ref = useRef<HTMLInputElement | null>(null);
	const textNum = {
		1: ['A', 'I', 'J', 'Q', 'Y'],
		2: ['B', 'K', 'R'],
		3: ['C', 'G', 'L', 'S'],
		4: ['D', 'M', 'T'],
		5: ['E', 'H', 'N', 'X'],
		6: ['U', 'V', 'W'],
		7: ['O', 'Z'],
		8: ['F', 'P']
	};
	const textNo = { A: 1, B: 2, C: 3, D: 4, E: 5, F: 8, G: 3, H: 5, I: 1, J: 1, K: 2, L: 3, M: 4, N: 5, O: 7, P: 8, Q: 1, R: 2, S: 3, T: 4, U: 6, V: 6, W: 6, X: 5, Y: 1, Z: 7 };
	const status = {
		too_lucky: [19, 23, 37, 41, 45],
		lucky: [1, 3, 5, 6, 9, 10, 14, 15, 16, 18, 21, 32, 33, 36, 42, 46, 50, 51],
		average: [2, 12, 30, 38, 39, 48, 54, 57],
		erase_enemy: [20, 52, 55],
		danger: [26, 29, 35, 44, 53],
		bad_luck: [11, 13, 17, 22, 28, 31, 40, 49, 58],
		deadly: [56],
		test: [25, 43, 47, 34]
	};

	const check_num = (num = '') => {
		let text = num || ref.current?.value;
		if (!!text) {
			text = text.toUpperCase();
			let total = 0;
			for (let i = 0; i < text.length; i++) {
				const elem = text[i];
				const asciiNo = elem.charCodeAt(0);
				//@ts-ignore
				if (isNaN(elem) && asciiNo >= 65 && asciiNo <= 90) {
					total += textNo[elem as keyof typeof textNo];
				} else {
					total += Number(elem);
				}
			}
			const stat = check_status(total);
			if (stat === '')
				check_num(String(total));
			else
				setValue({ total: total, status: stat });
		}
	};

	const check_status = (num: number) => {
		const keys = Object.keys(status);
		let stat = '';
		for (let i = 0; i < keys.length; i++) {
			const elem = keys[i];
			if (status[elem as keyof typeof status].includes(num)) {
				stat = elem;
				break;
			}
		}
		return stat;
	};

	return <div style={{
		height: '100vh',
		width: '100%'
	}}>
		<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', padding: '15px' }}>
			<div style={{ paddingBottom: '10px' }}>
				<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', flexWrap: 'wrap' }}>
					<input type="text" ref={ref}
						style={{ textTransform: 'uppercase', padding: '10px', fontSize: '14px' }}
						placeholder="Vehicle number"
						required />
					<button style={{ cursor: 'pointer', padding: '10px', fontSize: '14px' }} onClick={() => { check_num(); }}>Find</button>
				</div>
			</div>
			<div style={{ paddingBottom: '10px' }}>
				<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '10px' }}>
					<span><strong>Total : </strong><span>{value.total}</span></span>
					<span><strong>Status : </strong><span>{value.status}</span></span>
				</div>
			</div>
			<div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', paddingBottom: '10px' }}>
				{Object.keys(textNo).map(e => <div key={e} style={{
					border: '1px solid',
					padding: '5px',
					borderRadius: '4px',
					textAlign: 'center'
				}}>
					<div>{e}</div>
					<div>{textNo[e as keyof typeof textNo]}</div>
				</div>)}
			</div>
			<div>
				{Object.keys(status).map(e =>
					<div key={e} style={{ paddingBottom: '5px' }}>
						<div>{e}</div>
						<div style={{ display: 'flex', flexWrap: 'wrap' }}>
							{status[e as keyof typeof status].map(f => <span key={f} style={{
								border: '1px solid',
								padding: '3px',
								borderRadius: '4px',
								marginRight: '5px'
							}}>{f}</span>)}
						</div>
					</div>
				)}
			</div>
		</div>
	</div>;
}

export default Container;
