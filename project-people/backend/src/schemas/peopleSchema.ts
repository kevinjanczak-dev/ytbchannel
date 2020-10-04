import * as yup from 'yup'
import PeopleBd from '../database/peopleDb'

const peopleDb = new PeopleBd()

const PeopleSchema = yup.object().shape({
    id: yup.number().nullable(true),
    name: yup.string().required('Nome requerido'),
    email: yup.string().email('Email inválido').required('Email requerido'),
    cpf: yup.string()
        .length(14, 'CPF tem que conter no minimo 14 caracteres').required('CPF requerido')
        .test('unique-cpf', 'CPF já cadastrado na base', async function(value) {
            const { cpf, id } = this.parent
            const peoples = await peopleDb.uniqueCpf(cpf)
            if(peoples.length > 0) {
                const people = peoples.find(people => people.id !== id ?? 0)
                if(people) return false;
            }
            return true
        })
})

export default PeopleSchema