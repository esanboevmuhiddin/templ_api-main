const { createClient } = require ('@supabase/supabase-js')

// Create a single supabase client for interacting with your database
const supabase = createClient('https://pfqqofytfrwcvclywfrc.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBmcXFvZnl0ZnJ3Y3ZjbHl3ZnJjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ3ODEwMzYsImV4cCI6MjA2MDM1NzAzNn0.gKpsv9_FWdM89-6SkwoL1fTgBxVUhiDmRc2x6QxInSs')


const express = require("express")
const app = express()
const port = 3000

app.get('/students', async (req, res) => {

  const { data, error } = await supabase
  .from('students')
  .select()

  res.json(data)
})

app.post('/students/:id', async (req, res) => {

  const { data, error } = await supabase
  .from('students')
  .insert({ id : 3, full_name: 'Иванов Иван Иванович', birthday: '2005-02-10', group: 'ИС23/9-2' })

  res.json(data)
})

app.delete('/students/:id', async (req, res) => {
  const response = await supabase
  .from('students')
  .delete()
  .eq('id', req.params.id)
res.json('Студент с id = ' + req.params.id + 'удален!')

})

app.put('/students', async (req, res) => {
  
  const { data, error } = await supabase
  .from('students')
  .upsert({ id: 3, full_name: 'Морозова Елена Алексеевна', birthday: '1996-12-04', group: 'ГД 21/11' })
  .select()

  res.json(data)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
