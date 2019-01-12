import axios from '~/plugins/axios';

const imports = {
    state: {
        imports: []
    },
    mutations: {

    },
    actions: {
        uploadCsv({ commit }, file) {
            let formData = new FormData();
            formData.append('csv', file);

            axios.post('/imports/import', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(response => {
                console.log(response);
            })
        }
    }
}

export default imports;
