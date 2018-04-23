# Dynamic_Grid_Plugin

HOW TO USE

please follow the following Steps to
1. Include the JS file.
2. Add a div tag <div id="dynamic-grid"></div>
3. Include the following script.
    dynamic_grid = $("#dynamic-grid").dynamicGrid({
            "data": PASS_THE_JSON_FOR_PREPOPULATE_GRID,
            "cols": [{
                "label": "Name",
                "width": 182.5,
                "type": "text",
                "value": "name",
                "required": true
            }, {
                "label": "Email",
                "width": 234.5,
                "type": "email",
                "value": "email",
                "required": true,
                "no_duplicate": true
            }, {
                "label": "Phone",
                "width": 179,
                "type": "phone",
                "value": "phone",
                "required": true,
                "no_duplicate": true
            }, {
                "label": "DOB",
                "width": 154,
                "type": "dob",
                "required": true,
                "value": "dob"
            }, {
                "label": "Gender",
                "width": 138,
                "type": "select",
                "required": true,
                "options" : ["Select","Male","Female"],
                "value": "gender"
            }],
            "input_type": "inline",
            "sortable": "false",
            "index_label": "#",
            "label": "Add New Senior",
            "actions": ["Delete"]
        });
        
        
 
