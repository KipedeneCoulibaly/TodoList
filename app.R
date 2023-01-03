library(shiny)
library(shinyWidgets)

ui <- fluidPage(     
              title = "TodoList App",
              theme = 'css/style.css',
              lang = "en",                
              tags$head(
                     tags$script(src="js/app.js", type="module"),
                     tags$link(
                            HTML('<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css" 
                                 integrity="sha512-MV7K8+y+gLIBoVD59lQIYicR65iaqukzvf/nwasF0nqhPay5w/9lJmVM2hMDcnK1OnMGCdVK+iQrJ7lzPJQd1w==" 
                                 crossorigin="anonymous" referrerpolicy="no-referrer" />'),
                            HTML('<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet"
                                 integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD" crossorigin="anonymous">'),
                            HTML('<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.3/font/bootstrap-icons.css">')
                            )
                     ),
              tags$nav(
                     class = 'nav-bar', 
                     h1(class = 'title', 'TodoList'), 
                     div(
                            class = 'links',
                            h1('Home'),
                            h1(tags$i(class="fa-regular fa-heart")),
                            h1(tags$i(class="fa-regular fa-thumbs-up")),
                            h1(tags$a(
                                          class='logo-github', href='https://github.com/KipedeneCoulibaly/TodoList', 
                                          tags$i(class="fa-brands fa-square-github")
                                   )
                            )
                        )
                     ),
              # about panel
              dropdownButton(
                     div(
                            class="panel panel-default", 
                            div(   class="panel-about",  
                                   div( 
                                          align = "center",
                                          tags$img(src = "img/Photo1.jpg", width = "85px", height = "100px"),
                                          div( align = "center", h5("About Me :")),
                                          div(align = 'center', h6('Statistician Economist & Data Scientist'))
                                          ),
                                   div(   
                                          class='panel-networks',
                                          tags$ul(
                                                 tags$a(class='logo-github', href='https://github.com/KipedeneCoulibaly', 
                                                        tags$i(class="fa-brands fa-square-github")),
                                                 tags$a(class='logo-linkedin', href='https://www.linkedin.com/in/kipédènecoulibaly', 
                                                        tags$i(class="fa-brands fa-linkedin")),
                                                 tags$a(class='logo-kaggle', href='https://www.kaggle.com/kipedenecoulibaly', 
                                                        tags$i(class="fa-brands fa-kaggle")),
                                                 tags$a(class='logo-stackoverflow', href='https://stackoverflow.com/users/19874028/kip%c3%a9d%c3%a8ne', 
                                                        tags$i(class="fa-brands fa-stack-overflow")),
                                                 tags$a(class='logo-youtube', href='https://www.youtube.com/channel/UCu9DtdiIwd2gsrK3IvrEEOg', 
                                                        tags$i(class="fa-brands fa-youtube"))
                                                 ),
                                          div(   
                                                 class="Address",
                                                 align='center',
                                                 a(href="kipedene.coulibaly@gmail.com", "kipedene.coulibaly@gmail.com")
                                          )
                                   )
                            ),
                            div(   
                                   class='panel-about-app',
                                   align='center',
                                   p('This application is a todolist: task/project management.', br(), 'You can delete the default tasks and add your own.')
                            )
                     ), 
                     circle = T, status = 'danger', icon = icon('gear'), width = '300px', tooltip = tooltipOptions(title = 'About : Click to see !')
              ),
              tags$section(id = "todolist", class = "container pt-5")
                
)

server <- function(input, output) {}

shinyApp(ui = ui, server = server)
