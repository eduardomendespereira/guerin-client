<template>
        <table class="table table is-fullwidth">
            <thead>
                <th v-for="col in columns" :key="col.title">{{ col.name }}</th>
                <th>Editar</th>
            </thead>
            <tbody>
            <tr v-for="(row, index) in listagem" :key="index"> 
                <td v-for="col in columns" :key="col.name">
                    <slot :value="row[col.name]">{{row[col.name]}}</slot>
                </td>
                <td><router-link :to="{name: edit , params: {id: row.ID}}"><b-button variant="outline-success">Editar</b-button></router-link></td>
            </tr>
            </tbody>
        </table>
</template>
<script>
export default {
    props:{
        listagem:{
            type:[Array,Object],
            required:true,
        },
        columns: Array,
        edit : String     
    },
    mounted(){
        console.log(this.columns);
        console.log(this.listagem)
    }
}
</script>

<style>

</style>