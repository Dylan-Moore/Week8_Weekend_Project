import React from 'react';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Button } from '@mui/material';
import {chooseName, chooseGame_id, chooseType, chooseHeight, chooseWeight, chooseMoveset } from '../../redux/slices/rootSlice';
import { Input } from '../sharedComponents/Input/Input';
import { serverCalls } from '../../api';
import { useGetData } from '../../custom-hooks';
import { TextField } from '@mui/material';
import { List } from 'reselect/es/types';


interface PokemonFormProps{
    id?:string;
    data?: {};
}

interface PokemonState{
    name: string,
    game_id: BigInteger,
    type: string,
    height: BigInteger,
    weight: BigInteger,
    moveset: string
}

export const PokemonForm = (props:PokemonFormProps) => {
    const dispatch = useDispatch();
    let { pokemonData, getData } = useGetData()
    const store = useStore()
    const name = useSelector<PokemonState>(state => state.name)
    //const game_id = useSelector<PokemonState>(state => state.game_id)
    const type = useSelector<PokemonState>(state => state.type)
    const height = useSelector<PokemonState>(state => state.height)
    const weight = useSelector<PokemonState>(state => state.weight)
    const moveset = useSelector<PokemonState>(state => state.moveset)
    const { register, handleSubmit } = useForm ({ })

    const onSubmit = async(data:any, event:any) => {
        console.log(props.id)

        if ( props.id! ){
            await serverCalls.update(props.id!, data)
            console.log(`Updated: ${data} ${props.id}`)
            window.location.reload()
            event.target.reset()
        }
        else{
            if (data.name == 'random'){
                let random = Math.round(Math.random() * (950 - 1) + 1)
                console.log('in loop')
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${random}`)
                let data1 = await response.json()
                let m = []

                for (let i = 0; i < data1.moves.length; i++){
                    let move = data1['moves'][i]['move']['name']
                    m.push(move.toString())
                }
                let moves = m.join(", ")
                console.log(response.json())
                await dispatch(chooseName(data1['name']))
                await dispatch(chooseGame_id(data1['id']))
                await dispatch(chooseType(data1['types'][0]['type']['name']))
                await dispatch(chooseHeight(data1['height']))
                await dispatch(chooseWeight(data1['weight']))
                await dispatch(chooseMoveset(moves))
                await serverCalls.create(store.getState())
                window.location.reload()
                event.target.reset()
            }
            else{
                console.log('in else loop')
                let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${data.name}`)
                let data1 = await response.json()
                let m = []
                
                for (let i = 0; i < data1.moves.length; i++){
                    let move = data1['moves'][i]['move']['name']
                    m.push(move.toString())
                }
                let moves = m.join(", ")
                console.log(moves)
                console.log(data1['name'])
                console.log(data1['id'])
                console.log(data1['types'][0]['type']['name'])
                console.log(data1['height'])
                console.log(data1['weight'])
                await dispatch(chooseName(data1['name']))
                await dispatch(chooseGame_id(data1['id']))
                await dispatch(chooseType(data1['types'][0]['type']['name']))
                await dispatch(chooseHeight(data1['height']))
                await dispatch(chooseWeight(data1['weight']))
                await dispatch(chooseMoveset(moves))
                await serverCalls.create(store.getState())
                await window.location.reload()
                await event.target.reset()
            }
        }
        }
    
    return (
        <div>
            <form onSubmit = {handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="name">Pokemon Name</label>
                    <Input {...register('name')} name="name" placeholder="name" />
                </div>
                <div>
                    <label htmlFor="game_id">Pokemon Id</label>
                    <Input {...register('game_id')} name="game_id" placeholder="game_id" />
                </div>
                <div>
                    <label htmlFor="type">Pokemon type</label>
                    <Input {...register('type')} name="type" placeholder="type" />
                </div>
                <div>
                    <label htmlFor="height">Pokemon height</label>
                    <Input {...register('height')} name="height" placeholder="height" />
                </div>
                <div>
                    <label htmlFor="weight">Pokemon weight</label>
                    <Input {...register('weight')} name="weight" placeholder="weight" />
                </div>
                <div>
                    <label htmlFor="moveset">Pokemon moveset</label>
                    <Input {...register('moveset')} name="moveset" placeholder="moveset" />
                </div>
                <Button type='submit'>Submit</Button>
            </form>
        </div>
    )
}