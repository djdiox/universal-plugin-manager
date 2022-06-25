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

      <v-list flat subheader three-line>
        <v-subheader>Linked Applications</v-subheader>

        <v-list-item-group v-model="settings" multiple active-class="">
          <v-list-item>
            <template #default="{ }">
              <!-- <v-list-item-action>
                <v-checkbox :input-value="active" />
              </v-list-item-action> -->

              <v-list-item-content>
                <v-list-item-title>Todoist</v-list-item-title>
                <v-list>
                  <v-list-item v-for="task in tasks" :key="task.content">
                    <v-list-item-action>
                      <v-checkbox :input-value="task.completed" />
                    </v-list-item-action>

                    <v-list-item-content>
                      <v-list-item-title>{{ task.content }}</v-list-item-title>
                      <v-list-item-subtitle>{{ task.description }}</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-list-item-content>
            </template>
          </v-list-item>

          <v-list-item>
            <template #default="{ active }">
              <v-list-item-action>
                <v-checkbox :input-value="active" />
              </v-list-item-action>

              <v-list-item-content>
                <v-list-item-title>Sound</v-list-item-title>
                <v-list-item-subtitle>Auto-update apps at any time. Data charges may apply</v-list-item-subtitle>
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
  }
}
</script>

<style></style>
