export default {
    methods: {
        sendWhatsapp(NUMBER, MESSAGE) {
            let number = NUMBER;
            let message = MESSAGE;
            let url = "https://wa.me/";
            let end_url = `${url}${number}?text=${message}`;
            window.open(end_url,
                "_blank"
            );
        },
        showSnackbar(message, status, color) {
            if (message) {
                if (typeof message === "string") {
                    this.snackbar.show_snack = status;
                    this.snackbar.message_snack = message;
                    this.snackbar.color_snack = color;
                } else {
                    this.snackbar.show_snack = status;
                    this.snackbar.message_snack = message.join("\n");
                    this.snackbar.color_snack = color;
                }
            }
        },
        uuidv4() {
            return '4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = Math.random() * 16 | 0,
                    v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        },
        makeid(length) {
            var result = '';
            var characters = 'ABCDEFGHIJKLMNPQRSTUVWXYZ123456789';
            var charactersLength = characters.length;
            for (var i = 0; i < length; i++) {
                result += characters.charAt(Math.floor(Math.random() *
                    charactersLength));
            }
            return result;
        },
        setId() {
            var min = 99;
            var max = 9999999;
            var random = Math.floor(Math.random() * (max - min + 1)) + min;
            var id = new Date().getTime() + random;
            return id.toString();
        },
        capitalize(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        },
        titleCase(str) {
            if(str){

                return str.replace(
                    /\w\S*/g,
                    function(txt) {
                      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
                    }
                  );
            }else{
                return ""
            }
        },
        convertToSlug(Text) {
            return Text
                .toLowerCase()
                .replace(/ /g, '-')
                .replace(/[^\w-]+/g, '')
                ;
        },
        getcolorAvatar(name) {
            let acro = name.substring(0, 5);
            let colors = [
                "#F44336",
                "#E91E63",
                "#9C27B0",
                "#673AB7",
                "#3F51B5",
                "#2196F3",
                "#03A9F4",
                "#00BCD4",
                "#009688",
                "#4CAF50",
                "#8BC34A",
                "#FFC107",
                "#FF9800",
                "#FF5722",
                "#4527A0",
                "#01579B",
                "#B71C1C",
                "#880E4F",
                "#283593",
                "#1565C0",
                "#0277BD",
                "#4A148C",
                "#00796B",
                "#2E7D32",
                "#558B2F",
                "#FF6F00",
            ];
            let sum = 0;
            for (let j = 0; j < acro.length; j++) {
                sum += acro.charCodeAt(j);
            }
            let ascii = sum;
            let colortest = ascii % 26;
            return colors[colortest];
        },
        acronym(name, num) {
            let matches = name.match(/\b(\w)/g);   //[g,r,t,o]
            let acro = matches.join('');
            return acro.substring(0, num).toUpperCase();
        },
        imageExists(image_url) {
            var http = new XMLHttpRequest();
            http.open('HEAD', image_url, false);
            http.send();
            return http.status != 404;
        },
        reduceArray(myArray) {
            return Object.values(myArray).reduce(
                (t, {
                    precio
                }) => t + Number(precio),
                0
            );
        },
    }
};
