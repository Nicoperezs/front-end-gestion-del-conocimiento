var data;
axios.get('https://siecons.com/libs/PHP/ldc-control-capacitaciones/empleados/todos/habilidades.php'
	,{params:{
		API_KEY:'7c095b66dc21c694706e7ae16e1c0565'
		,sectorID:2
	}}
)
	.then(res=>{
		data=res.data;

		// Ponemos todas las habilidades y guardamos el contenedor de los valores.
		let bottom=gEt('matriz__bottom');
		let habilidadesContainers=[];
		for(let habilidad of Object.entries(data.habilidades)){
			habilidadesContainers.push([
				habilidad[0]
				,addElement(bottom,['DIV',{class:'code__line',children:[
					['DIV',{class:'code__line__number',innerText:habilidad[0]}]
					,['DIV',{class:'code__line__type',innerText:habilidad[1]}]
					,['DIV',{class:'code__line__number__container'}]
				]}]).children[2]
			]);
		}

		// Iteramos los puestos
		let header=gEt('matriz-center-grupo');
		for(let puesto of Object.values(data.puestos)){
			let columnPerson={};
			// Ponemos las habilidad del puesto si la hay, y el contenedor de los valores de las personas.
			for(let habilidadContainer of habilidadesContainers){
				let habilidadID=habilidadContainer[0];
				columnPerson[habilidadID]=addElement(
					habilidadContainer[1]
					,['DIV',{class:'code__line__number__area',children:[
						['DIV',{class:'code__line__column',innerText:puesto.vectorHabilidades[habilidadID]||''}]
						,['DIV',{class:'code__line__column__person'}]
					]}]
				).children[1];
			}
			// Ponemos el puesto en el encabezado
			addElement(header,['DIV',{class:'grupo-header',children:[
				['DIV',{class:'legajo',innerText:'Legajo'}]
				,['DIV',{class:'grupo-name',innerText:puesto.descripcion}]
				// Iteramos por las personas de este puesto.
			]}],['DIV',{class:'grupo-personas',children:Object.values(data.empleados).filter(emp=>emp.puestoID==puesto.ID).map(emp=>{
				// Ponemos cada habilidad del empleado en cada contenedor. También ponemos valores vacíos para rellenar.
				for(let [habilidadID,contenedor] of Object.entries(columnPerson)){
					let thisHabilidad=emp.vectorHabilidades[habilidadID];
					addElement(
						contenedor
						,['DIV',{class:'code__line__column__person__cant',innerText:thisHabilidad==undefined?'':thisHabilidad}]
					);
				}
				// Ponemos el nombre de la en el encabezado.
				return ['DIV',{class:'persona',children:[
					['DIV',{class:'persona-legajo',innerText:emp.legajo}]
					,['DIV',{class:'persona-name',innerText:emp.nombre+' '+emp.apellido}]
				]}]
			})}]);
		}

	});
