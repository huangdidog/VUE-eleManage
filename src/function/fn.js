
export let wan = (v) => {
	//console.log(v);
    return v < 10000 ? v : (v/10000).toFixed(2) + '万';
}

export let p=(s)=> {
    return s < 10 ? '0' + s: s;
}
