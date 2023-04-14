

//client side code 
  $(document).ready(() => {
    // Get all cars
    $.get('/cars', (cars) => {
      for (const car of cars) {
        $('#car-list').append(`<li>${car.make} - ${car.colour} - ${car.price} - <button class="edit-car" data-id="${car.id}">Edit</button> <button class="delete-car" data-id="${car.id}">Delete</button></li>`)
      }
    })

    // Add a car
    //fun gets called when form is submitted
    $('#add-car-form').submit((event) => {
      event.preventDefault()
      const make = $('#make').val()
      const colour = $('#colour').val()
      const price = $('#price').val()
      $.post('/cars', { make, colour, price }, (car) => {
        $('#car-list').append(`<li>${car.make} - ${car.colour} - ${car.price} - <button class="edit-car" data-id="${car.id}">Edit</button> <button class="delete-car" data-id="${car.id}">Delete</button></li>`)
        $('#add-car-form')[0].reset()
      })
    })

    // Edit a car
    $('#car-list').on('click', '.edit-car', function () {
      const id = $(this).data('id')
      const car = $(this).parent().text().trim().split(' - ')
      $('#make').val(car[0])
      $('#colour').val(car[1])
      $('#price').val(car[2])
      $('#add-car-form').append(`<input type="hidden" id="edit-car-id" value="${id}">`)
      $('#add-car-form').append('<input type="submit" id="update-car-button" value="Update Car">')
      $(this).parent().remove()
    })

    $('#add-car-form').on('submit', '#update-car-button', function (event) {
      event.preventDefault()
      const id = $('#edit-car-id').val()
      const make = $('#make').val()
      const colour = $('#colour').val()
      const price = $('#price').val()
      $.ajax({
        url: `/cars/${id}`,
        type: 'PUT',
        data: { make, colour, price },
        success: (car) => {
          $('#car-list').append(`<li>${car.make} - ${car.colour} - ${car.price} - <button class="edit-car" data-id="${car.id}">Edit</button> <button class="delete-car" data-id="${car.id}">Delete</button></li>`)
          $('#add-car-form')[0].reset()
        }
      })
    })

    // Delete a car
    $('#car-list').on('click', '.delete-car', function () {
      const id = $(this).data('id')
      $.ajax({
        url: `/cars/${id}`,
        type: 'DELETE',
        success: () => {
          $(this).parent().remove()
        }
      })
    })
  })
