sgdf.factory "formHandler", ($http) ->

  # question
  sendContact: (name, email, content, me) ->
    $http(
      url: blogInfo.api + 'send_contact/'
      method: 'POST'
      data:
      	name: name
      	email: email
      	content: content
      	me: me
    ).then (result) ->
      result.data