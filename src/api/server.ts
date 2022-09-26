let token = `23a5d995d53071e53a30257cab9b61fad78cc223eabb2b9a`


export const serverCalls = {
    get: async () => {
        const response = await fetch (`https://pokemon-team-generator.herokuapp.com/api/pokemons`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': `Bearer ${token}`
        }
    });

    if(!response.ok){
        throw new Error('Failed to fetch data from server')
    }
    return await response.json()
    },

    create: async(data:any) => {
        const response = await fetch(`https://pokemon-team-generator.herokuapp.com/api/pokemon`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });

        if(!response.ok){
            throw new Error('Failed to create new data on server')
        }
        return await response.json()
    },

    update: async(id:string, data:any) => {
        const response = await fetch(`https://pokemon-team-generator.herokuapp.com/api/pokemon/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type':
                'application/json',
                'x-access-token': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });

        if(!response.ok){
            throw new Error(`Failed to Update Pokemon Id ${id} on server`)
        }
        return await response.json()
    },

    delete: async(id:string) => {
        const response = await fetch(`https://pokemon-team-generator.herokuapp.com/api/pokemon/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `Bearer ${token}`
            }
        });

        if(!response.ok){
            throw new Error(`Failed to Delete Pokemon Id ${id} on server`)
        }
        return await response.json()
    }
}