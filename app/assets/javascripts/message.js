$(function(){
  function buildHTML(message){
    // 「もしメッセージに画像が含まれていたら」という条件式
    if (message.image) {
      var html = //メッセージに画像が含まれる場合のHTMLを作る
      `<div class="message">
        <div class="upper-message">
          <div class="upper-message__user-name">       
          ${message.user_name}
      </div>
        <div class="upper-message__date">
        ${message.created_at}
      </div>
    </div>
      <div class="lower-message">
        <p class="lower-message__content">
          ${message.content}
        </p>
      </div>
      <img src=${message.image} >    
       </div>`
     return html;
    } else {
      var html = //メッセージに画像が含まれない場合のHTMLを作る
      `<div class="message">
        <div class="upper-message">
          <div class="upper-message__user-name">       
          ${message.user_name}
      </div>
        <div class="upper-message__date">
        ${message.created_at}
     </div>
      </div>
      <div class="lower-message">
        <p class="lower-message__content">
          ${message.content}
        </p>  
      </div>
       </div>`
       return html;
    };
    
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,  //同期通信でいう『パス』
      type: 'POST',  //同期通信でいう『HTTPメソッド』
      data: formData,  
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.chat_main__message_list').append(html);      
      $('form')[0].reset();
      $('.chat_main__message_list').animate({ scrollTop: $('.chat_main__message_list')[0].scrollHeight});
      $('.chat_main__message_form__group__sendbtn').prop('disabled', false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
      $('.chat_main__message_form__group__sendbtn').prop('disabled', false);
    })
    .always(function() {
      $('.chat_main__message_form').prop('disabled', false);   // 対象セレクタは書き換えてください。
    });          
  })
})
    
  

