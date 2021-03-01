
<el-dialog title="" :visible.sync="dialogBiomeVisible">
    <NationalBiome :closeValue="'TypeBiome'" @closeMoule="closeMoule"></NationalBiome>
</el-dialog>

<script>
    export default {
        props:['closeValue'],
        
    }
</script>