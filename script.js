(function(){
  // Menú móvil
  var btn=document.getElementById('menuBtn'), menu=document.getElementById('menu');
  if(btn&&menu){
    btn.addEventListener('click',function(){
      var abierto=menu.classList.toggle('abierto');
      btn.setAttribute('aria-expanded',abierto);
      btn.setAttribute('aria-label',abierto?'Cerrar menú':'Abrir menú');
    });
  }

  // Filtros de productos
  var filtros=document.querySelectorAll('.filtro');
  filtros.forEach(function(f){
    f.addEventListener('click',function(){
      filtros.forEach(function(x){x.classList.remove('activo')});
      f.classList.add('activo');
      var cat=f.getAttribute('data-filtro');
      document.querySelectorAll('#listado .tarjeta').forEach(function(t){
        t.hidden=(cat!=='todos'&&t.getAttribute('data-cat')!==cat);
      });
    });
  });

  function mensaje(id,texto,tipo){
    var el=document.getElementById(id);
    if(!el)return;
    el.textContent=texto; el.className='msg '+tipo;
  }
  var reCorreo=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Contacto
  var fc=document.getElementById('formContacto');
  if(fc){
    fc.addEventListener('submit',function(e){
      e.preventDefault();
      if(!fc.nombre.value.trim()) return mensaje('msgContacto','Escribe tu nombre.','error');
      if(!reCorreo.test(fc.correo.value)) return mensaje('msgContacto','Escribe un correo válido.','error');
      mensaje('msgContacto','Gracias, '+fc.nombre.value.trim()+'. Te responderemos en menos de 24 horas.','ok');
      fc.reset();
    });
  }

  // Cuenta: pestañas
  var paneles={registro:document.getElementById('panel-registro'),login:document.getElementById('panel-login')};
  var tabs=document.querySelectorAll('.tab');
  function mostrar(nombre){
    Object.keys(paneles).forEach(function(k){ if(paneles[k]) paneles[k].hidden=(k!==nombre); });
    tabs.forEach(function(t){
      var on=t.getAttribute('data-panel')===nombre;
      t.classList.toggle('activo',on); t.setAttribute('aria-selected',on);
    });
  }
  document.querySelectorAll('[data-panel]').forEach(function(el){
    el.addEventListener('click',function(){ mostrar(el.getAttribute('data-panel')); });
  });
  if(location.hash==='#login') mostrar('login');

  // Registro
  var fr=paneles.registro;
  if(fr){
    fr.addEventListener('submit',function(e){
      e.preventDefault();
      var n=document.getElementById('r-nombre').value.trim(),
          c=document.getElementById('r-correo').value,
          p=document.getElementById('r-pass').value,
          p2=document.getElementById('r-pass2').value;
      if(!n) return mensaje('msgRegistro','Escribe tu nombre completo.','error');
      if(!reCorreo.test(c)) return mensaje('msgRegistro','Escribe un correo válido.','error');
      if(p.length<8) return mensaje('msgRegistro','La contraseña debe tener al menos 8 caracteres.','error');
      if(p!==p2) return mensaje('msgRegistro','Las contraseñas no coinciden.','error');
      mensaje('msgRegistro','Cuenta creada. Ya puedes iniciar sesión.','ok');
      fr.reset();
      setTimeout(function(){mostrar('login');},1200);
    });
  }

  // Login
  var fl=paneles.login;
  if(fl){
    fl.addEventListener('submit',function(e){
      e.preventDefault();
      var c=document.getElementById('l-correo').value, p=document.getElementById('l-pass').value;
      if(!reCorreo.test(c)) return mensaje('msgLogin','Escribe un correo válido.','error');
      if(!p) return mensaje('msgLogin','Escribe tu contraseña.','error');
      mensaje('msgLogin','Sesión iniciada. Bienvenido a Casa Migaja.','ok');
    });
  }
})();
