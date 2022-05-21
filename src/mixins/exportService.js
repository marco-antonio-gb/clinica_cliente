export default {
    methods: {
        async downloadExcelParticipacion(idEvento, format, fileName) {
            this.onDownload = true
            try {
                let response = await this.axios.get('/download-report/' + idEvento + '/' + format, { responseType: 'arraybuffer' });
                var fileURL = window.URL.createObjectURL(new Blob([response.data]));
                var fileLink = document.createElement('a');
                fileLink.href = fileURL;
                fileLink.setAttribute('download', fileName + '.' + format);
                document.body.appendChild(fileLink);
                fileLink.click();
                this.onDownload = false
            } catch (error) {
                this.onDownload = false
                this.showSnackbar(
                    error.name + ': ' + error.message,
                    true,
                    "warning"
                );
            }
        },
        async downloadExcelReport(model, format) {
            let year = new Date().getFullYear()
            this.onDownload = true
            try {
                let title = 'reporte_' + model + '_' + year;
                let response = await this.axios.get('/download-excel-report/' + model + '/' + format, { responseType: 'arraybuffer' });
                var fileURL = window.URL.createObjectURL(new Blob([response.data]));
                var fileLink = document.createElement('a');
                fileLink.href = fileURL;
                fileLink.setAttribute('download', title.toUpperCase() + '.' + format);
                document.body.appendChild(fileLink);
                fileLink.click();
                this.onDownload = false
            } catch (error) {
                this.onDownload = false
                this.showSnackbar(
                    error.name + ': ' + error.message,
                    true,
                    "warning"
                );
            }
        },
        async getDownloadExport(model, data, format) {
            this.onDownload = true
            let year = new Date().getFullYear()
            try {
                let title = 'reporte_' + model + '_' + year;
                let response = await this.axios.post('/download-report', data, {
                    responseType: 'arraybuffer'
                });
                var fileURL = window.URL.createObjectURL(new Blob([response.data]));
                var fileLink = document.createElement('a');
                fileLink.href = fileURL;
                fileLink.setAttribute('download', title.toUpperCase() + '.' + format);
                document.body.appendChild(fileLink);
                fileLink.click();
                this.onDownload = false
            } catch (error) {
                this.onDownload = false
                this.showSnackbar(
                    error.name + ': ' + error.message,
                    true,
                    "warning"
                );
            }
        },
        async downloadZipFile(ID_EVENTO) {
            try {  
                this.onDownload = true
                let filename = ""
                let response = await this.axios.get('/download-zip-folder/' + ID_EVENTO, { responseType: 'blob' });
                if (response.headers['content-type'] === 'application/zip') {
                    var disposition = response.headers['content-disposition'];
                    if (disposition && disposition.indexOf('attachment') !== -1) {
                        var filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
                        var matches = filenameRegex.exec(disposition);
                        if (matches != null && matches[1]) filename = matches[1].replace(/['"]/g, '');
                    }
                    const url = window.URL.createObjectURL(new Blob([response.data], {
                        type: 'application/zip'
                    }))
                    const link = document.createElement('a')
                    link.href = url
                    link.setAttribute('download', filename)
                    document.body.appendChild(link)
                    link.click()
                    this.onDownload = false
                } else {
                    this.onDownload = false
                    this.showSnackbar(
                        "No hay archivos disponibles",
                        true,
                        "warning"
                    );
                }
            } catch (error) {
                this.onDownload = false
                this.showSnackbar(
                    error.name + ': ' + error.message,
                    true,
                    "warning"
                );
            }
        },
    }
}