import axios from 'axios';
const authToken = "KB88R3XAatNZJ9OhMk74pE3VuIWuG2yn7tBjhnXLzOFos0tbqd3jdlyLersjFhrZ";
export async function getSites(number:any){
	const response = await axios({
		method: 'GET',
		baseURL: "http://localhost:8000/api/",
		url: `Sites?filter=%7B%22limit%22%3A%221000%22%2C%22skip%22%3A%22${number * 1000}%22%7D`,
		params: {
			access_token: authToken,
		},
    })
    return response.data;

}

export async function getSocialAccounts(number:any){
	const response = await axios({
		method: 'GET',
		baseURL: "http://localhost:8000/api/",
		url: `SocialAccounts?filter=%7B%22limit%22%3A%221000%22%2C%22skip%22%3A%22${number*1000}%22%7D`,
		params: {
			access_token: authToken,
		},
    })
    return response.data;

}


export async function getCapibilities(number:any){
	const response = await axios({
		method: 'GET',
		baseURL: "http://localhost:8000/api/",
		url: `Capabilities?filter=%7B%22limit%22%3A%20%221000%22%2C%22skip%22%3A%22${number*1000}%22%7D`,
		params: {
			access_token: authToken,
		},
    })
    return response.data;

}

export async function getEvents(number:any){
	const response = await axios({
		method: 'GET',
		baseURL: "http://localhost:8000/api/",
		url: `Events?filter=%7B%22limit%22%3A%221000%22%2C%22skip%22%3A%22${number *1000}%22%7D`,
		params: {
			access_token: authToken,
		},
    })
    return response.data;

}



export async function createEvents(obj:any){
	return axios({
		method: 'POST',
		baseURL: "http://localhost:8090/",
		url: 'Event',
        data : obj
    }).catch((res)=>{
        console.log(res)
    })

	// return response.data.accounts;
}


export async function createCapibilities(obj:any){
	return axios({
		method: 'POST',
		baseURL: "http://localhost:8090/",
		url: 'Capability',
        data : obj
    }).catch((res)=>{
        console.log(res)
    })

	// return response.data.accounts;
}

export async function createSocialAccounts(obj:any){
	return axios({
		method: 'POST',
		baseURL: "http://localhost:8090/",
		url: 'SocialAccount',
        data : obj
    }).catch((res)=>{
        console.log(res)
    })

	// return response.data.accounts;
}

export async function createAccountsRecord(obj:any){
	return axios({
		method: 'POST',
		baseURL: "http://localhost:8090/",
		url: 'person',
        data : obj
    }).catch((res)=>{
        console.log(res)
    })

	// return response.data.accounts;
}
export async function createSitesRecord(obj:any){	
    return axios({
		method: 'POST',
		baseURL: "http://localhost:8090/",
		url: 'place',
        data : obj
    }).catch((res)=>{
        console.log(res)
    })
}

export async function getDeviceAssets(numbers:any){
	const response = await axios({
		method: 'GET',
		baseURL: "http://localhost:8000/api/",
		url: `Devices?filter=%7B%22include%22%3A%22asset%22%2C%22limit%22%3A%221000%22%2C%22skip%22%3A%22${numbers*1000}%22%7D`,
		params: {
			access_token: authToken,
		},
    })
    return response.data;
}

export async function getFactsDaily(numbers:any){
	const response = await axios({
		method: 'GET',
		baseURL: "http://localhost:8000/api/",
		url: `FactsDaily?filter=%7B%22limit%22%3A%221000%22%2C%22skip%22%3A%22${numbers *1000}%22%7D`,
		params: {
			access_token: authToken,
		},
    })
    return response.data;
}

export async function createFactsDaily(obj:any){
	return axios({
		method: 'POST',
		baseURL: "http://localhost:8090/",
		url: 'FactsDaily',
        data : obj
    }).catch((res)=>{
        console.log(res)
    })
}

export async function getFactsWeekly(numbers:any){
	const response = await axios({
		method: 'GET',
		baseURL: "http://localhost:8000/api/",
		url: `FactsWeekly?filter=%7B%22limit%22%3A%221000%22%2C%22skip%22%3A%22${numbers *1000}%22%7D`,
		params: {
			access_token: authToken,
		},
    })
    return response.data;
}

export async function createFactsWeekly(obj:any){
	return axios({
		method: 'POST',
		baseURL: "http://localhost:8090/",
		url: 'FactsWeekly',
        data : obj
    }).catch((res)=>{
        console.log(res)
    })

	// return response.data.accounts;
}

export async function getFactsMonthly(numbers:any){
	const response = await axios({
		method: 'GET',
		baseURL: "http://localhost:8000/api/",
		url: `FactsMonthly?filter=%7B%22limit%22%3A%221000%22%2C%22skip%22%3A%22${numbers *1000}%22%7D`,
		params: {
			access_token: authToken,
		},
    })
    return response.data;
}

export async function createFactsMonthly(obj:any){
	return axios({
		method: 'POST',
		baseURL: "http://localhost:8090/",
		url: 'FactsMonthly',
        data : obj
    }).catch((res)=>{
        console.log(res)
    })
}

export async function getFactsHourly(numbers:any){
	const response = await axios({
		method: 'GET',
		baseURL: "http://localhost:8000/api/",
		url: `FactsHourly?filter=%7B%22limit%22%3A%221000%22%2C%22skip%22%3A%22${numbers *1000}%22%7D`,
		params: {
			access_token: authToken,
		},
    })
    return response.data;
}

export async function createFactsHourly(obj:any){
	return axios({
		method: 'POST',
		baseURL: "http://localhost:8090/",
		url: 'FactsHourly',
        data : obj
    }).catch((res)=>{
        console.log(res)
    })
}


export async function getFactsQuaterly(numbers:any){
	const response = await axios({
		method: 'GET',
		baseURL: "http://localhost:8000/api/",
		url: `FactsQuaterly?filter=%7B%22limit%22%3A%221000%22%2C%22skip%22%3A%22${numbers *1000}%22%7D`,
		params: {
			access_token: authToken,
		},
    })
    return response.data;
}

export async function createFactsQuaterly(obj:any){
	return axios({
		method: 'POST',
		baseURL: "http://localhost:8090/",
		url: 'FactsQuaterly',
        data : obj
    }).catch((res)=>{
        console.log(res)
    })
}

export async function getFactsBike(numbers:any){
	const response = await axios({
		method: 'GET',
		baseURL: "http://localhost:8000/api/",
		url: `FactsBike?filter=%7B%22limit%22%3A%221000%22%2C%22skip%22%3A%22${numbers *1000}%22%7D`,
		params: {
			access_token: authToken,
		},
    })
    return response.data;
}

export async function createFactsBike(obj:any){
	return axios({
		method: 'POST',
		baseURL: "http://localhost:8090/",
		url: 'FactsBike',
        data : obj
    }).catch((res)=>{
        console.log(res)
    })
}

export async function getTimeDimension(numbers:any){
	const response = await axios({
		method: 'GET',
		baseURL: "http://localhost:8000/api/",
		url: `TimeDimension?filter=%7B%22limit%22%3A%221000%22%2C%22skip%22%3A%22${numbers *1000}%22%7D`,
		params: {
			access_token: authToken,
		},
    })
    return response.data;
}

export async function createTimeDimension(obj:any){
	return axios({
		method: 'POST',
		baseURL: "http://localhost:8090/",
		url: 'TimeDimension',
        data : obj
    }).catch((res)=>{
        console.log(res)
    })
}


export async function getSpecificationCapibilities(id:any){
	const response = await axios({
		method: 'GET',
		baseURL: "http://localhost:8000/api/",
		url: `SpecificationCapabilityItems?filter=%7B%22where%22%3A%7B%22specificationId%22%3A%22${id}%22%7D%7D`,
		params: {
			access_token: authToken,
		},
    })
    return response.data;

}


export async function createSchema(obj:any){	
    return axios({
		method: 'POST',
		baseURL: "http://localhost:8090/",
		url: 'schema',
        data : obj
    }).catch((res)=>{
        console.log(res)
    })
}

export async function createThingsRecord(obj:any){	
    return axios({
		method: 'POST',
		baseURL: "http://localhost:8090/",
		url: 'thing',
        data : obj
    }).catch((res)=>{
        console.log(res)
    })
}