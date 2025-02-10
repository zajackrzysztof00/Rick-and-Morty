import axios from "axios"

export const GetCharacterInfo = (id) =>
    {
        return axios.get(`https://rickandmortyapi.com/api/character/${id}`)
            .then(characterResponse => characterResponse.data)
    }

export const GetOriginInfo = (url) =>
    {
        return axios.get(url).then(locationResponse => locationResponse.data)
    }

export const GetLocationInfo = (url) =>
{
    return axios.get(url).then(locationResponse => locationResponse.data)
}

export const GetEpisodesInfo = (urls) =>
{
    return Promise.all(urls?.map(url =>
        axios.get(url).then(episodesResponse => episodesResponse.data))
    )
}

export const GetCharacters = (page, status) =>
{
    if (status == undefined || status == 'none'){
        return axios.get(`https://rickandmortyapi.com/api/character/?page=${page}`)
        .then(response => response.data)
    }
    return axios.get(`https://rickandmortyapi.com/api/character/?page=${page}&status=${status}`)
    .then(response => response.data)
}