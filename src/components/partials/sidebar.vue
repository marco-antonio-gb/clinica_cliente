<template>
<v-list dense nav>
    
    <span v-for="item in currentItems" :key="item.title">
        <v-list-item class="mb-1" link :to="item.href" v-if="!item._children">
            <v-list-item-icon>
                <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
        </v-list-item>
        <span v-else>
            <v-subheader>
                {{item._children}}
            </v-subheader>
            <v-divider class="my-2"></v-divider>
        </span>
    </span>
</v-list>
</template>
<script>
import nav from './_navs_menu'
import {
    mapGetters,
} from 'vuex'
export default {
    data() {
        return {
            role: "user",
        }
    },
    computed: {
        currentItems() {
            //sidebar items are not shown until role is known
            if (this.role === "unknown") {
                return [];
            }
            return nav.items.filter(item => {
                if (this.rolesusuario === undefined) {
                    return [];
                } else {
                    if(this.rolesusuario){

                        return !item.role || this.rolesusuario.some(r => item.role.includes(r))
                    }
                }
            });
        },
        ...mapGetters({
            rolesusuario: 'auth/roles'
        })
    }
}
</script>
