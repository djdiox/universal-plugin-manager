<template>
  <v-container>
    <v-card class="mx-auto" max-width="400">
      <v-toolbar color="purple" dark>
        <v-app-bar-nav-icon />

        <v-toolbar-title>Settings</v-toolbar-title>

        <v-spacer />

        <v-btn icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
      </v-toolbar>

      <!-- <v-list subheader three-line>
        <v-subheader>User Controls</v-subheader>

        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Content filtering</v-list-item-title>
            <v-list-item-subtitle>
              Set the content filtering level to restrict appts that can be downloaded
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Password</v-list-item-title>
            <v-list-item-subtitle>
              Require password for purchase or use password to restrict purchase
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-divider /> -->

      <v-list flat subheader two-line>
        <v-subheader>Linked Applications</v-subheader>

        <v-list-item-group v-model="settings" multiple active-class="">
          <v-list-item>
            <template #default="{}">
              <!-- <v-list-item-action>
                <v-checkbox :input-value="active" />
              </v-list-item-action> -->

              <v-list-item-content>
                <v-list-item-title>Tasks</v-list-item-title>
                <!-- <v-list two-line subheader>
                  <v-list-item v-for="task in tasks" :key="task.content">
                    <v-list-item-action>
                      <v-checkbox :input-value="task.completed" />
                    </v-list-item-action>

                    <v-list-item-content>
                      <v-list-item-title>{{ task.content }}</v-list-item-title>
                      <v-list-item-subtitle>{{ task.description }}</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-list> -->
                <v-list-group :value="true" no-action sub-group>
                  <template #activator>
                    <v-list-item-content>
                      <v-list-item-title>
                        by <a href="#" @click="openUrl('www.todoist.com')">Todoist</a>
                      </v-list-item-title>
                      <v-list-item-subtitle>
                        <a href="#" @click="openUrl('https://todoist.com/downloads')">Free Download</a> available
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </template>

                  <v-list-item v-for="(task, i) in tasks" :key="i" link>
                    <v-list-item-action>
                      <v-checkbox :input-value="task.completed" />
                    </v-list-item-action>
                    <v-list-item-content>
                      <!-- <v-list-item-title v-text="'Task #' + i + ': ' + task.content" /> -->
                      <v-list-item-title v-text="'Task #' + i" />
                      <v-list-item-subtitle v-text="task.content" />
                    </v-list-item-content>
                    <!-- <v-list-item-icon>
                      <v-icon v-text="'mdi-tag'" />
                    </v-list-item-icon> -->
                  </v-list-item>
                </v-list-group>
              </v-list-item-content>
            </template>
          </v-list-item>

          <v-list-item>
            <template #default="{ active }">
              <v-list-item-action>
                <v-checkbox :input-value="active" />
              </v-list-item-action>

              <v-list-item-content>
                <v-list-item-title><a @click="openUrl('www.notion.so')"> Notion</a></v-list-item-title>
                <v-list-item-subtitle>Very famous Todo & Confluence + Calendar Tool</v-list-item-subtitle>
              </v-list-item-content>
            </template>
          </v-list-item>

          <v-list-item>
            <template #default="{ active }">
              <v-list-item-action>
                <v-checkbox :input-value="active" />
              </v-list-item-action>

              <v-list-item-content>
                <v-list-item-title>Auto-add widgets</v-list-item-title>
                <v-list-item-subtitle>
                  Automatically add home screen widgets when downloads complete
                </v-list-item-subtitle>
              </v-list-item-content>
            </template>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-card>
  </v-container>
</template>

<script>
import todoist from '~/api/todoist'
const { shell } = require('electron')

export default {
  data: () => ({
    tasks: [],
    items: [
      { action: 'mdi-ticket', items: [{ title: 'List Item' }], title: 'Attractions' },
      {
        action: 'mdi-silverware-fork-knife',
        active: true,
        items: [{ title: 'Breakfast & brunch' }, { title: 'New American' }, { title: 'Sushi' }],
        title: 'Dining'
      },
      { action: 'mdi-school', items: [{ title: 'List Item' }], title: 'Education' },
      { action: 'mdi-human-male-female-child', items: [{ title: 'List Item' }], title: 'Family' },
      { action: 'mdi-bottle-tonic-plus', items: [{ title: 'List Item' }], title: 'Health' },
      { action: 'mdi-briefcase', items: [{ title: 'List Item' }], title: 'Office' },
      { action: 'mdi-tag', items: [{ title: 'List Item' }], title: 'Promotions' }
    ]
  }),
  fetchOnServer: false,
  async fetch () {
    this.tasks = await todoist.getTasks()
    this.tasks = this.tasks.map(t => {
      t.active = !t.completed
      return t
    })
    console.log(this.tasks)
  },
  methods: {
    async openUrl (link) {
      await shell.openExternal(link)
    }
  }
}
</script>

<style></style>
