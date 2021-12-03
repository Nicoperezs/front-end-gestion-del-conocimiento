var data;
/* sendJSON('https://siecons.com/libs/PHP/ldc-control-capacitaciones/empleados/todos/capacidades.php',{
	API_KEY:'7c095b66dc21c694706e7ae16e1c0565'
	,sectorID:2
}) */
axios.get('https://siecons.com/libs/PHP/ldc-control-capacitaciones/empleados/todos/capacidades.php'
	,{params:{
		API_KEY:'7c095b66dc21c694706e7ae16e1c0565'
		,sectorID:2
	}}
)//?API_KEY=7c095b66dc21c694706e7ae16e1c0565&sectorID=2')
	// .then(res=>res.json())
	.then(res=>{
		data=res.data;

		let cont=gEt('cont');
		let capacidadtittle=gEt('capacidadtittle');
		let habilidades=Object.entries(data.capacidades);
		for(let habilidad of habilidades){
			addElement(cont,['DIV',{class:'filenumber',innerText:habilidad[0]}]);
			addElement(capacidadtittle,['DIV',{class:'captittle',innerText:habilidad[1]}]);
		}

		let habilidadesHeaderPersonas=gEt('habilidades-header');
		let numberOpc=gEt('number-opc');
		for(let puesto of Object.values(data.puestos)){
			addElement(habilidadesHeaderPersonas,['DIV',{class:'personainfo',children:[
				['DIV',{class:'contenido',innerText:'Legajo'}]
				,['DIV',{class:'contenido',innerText:puesto.descripcion}]
			]}]);
			addElement(numberOpc,['DIV',{
				class:"tilenumber"
				,style:{background: "lightseagreen"}
				,children:habilidades.map(hab=>['DIV',{class:'numberbox',innerText:puesto.vectorCapacidades[hab[0]]||''}])
			}]);
			for(let empleado of Object.values(data.empleados).filter(emp=>emp.puestoID==puesto.ID)){
				addElement(habilidadesHeaderPersonas,['DIV',{class:'personacont',children:[
					['DIV',{class:'legajo',innerText:empleado.legajo}]
					,['DIV',{class:'profesion',innerText:empleado.nombre+' '+empleado.apellido}]
				]}]);
				addElement(numberOpc,['DIV',{
					class:"tilenumber"
					,children:habilidades.map(hab=>['DIV',{
						class:'numberbox'
						,innerText:(cap=>cap==undefined?'':cap)(empleado.vectorCapacidades[hab[0]])
					}])
				}]);
			}
		}

		habilidadesHeaderPersonas.innerHTML+=`
		<div class="tituloporcentajes">
				<div class="segun1">A capacitar</div>
				<div class="segun2">Cumplen lo Requerido</div>
				<div class="segun3">% de cumplimiento</div>
		</div>`;
	});