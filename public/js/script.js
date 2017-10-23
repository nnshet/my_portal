$(document).ready(function(){
    $("#myBtn").click(function(){
        $("#myModal").modal();
    });
    
    $("#editSummary").click(function(){
            
       $("#modalForSummary").find("#summary").text($("#writtenSummary").text())    
       $("#modalForSummary").modal();
    });
    //$('#delete-file-modal .modal-footer button').on('click', function(event) {
    $("#updateSummaryFromModal").click(function(){
        
        var summary = $("#summary").val();
        console.log(summary);
        var data = {
            "summary":summary
        }
        $.ajax({
            
            type:"POST",
            contentType: "application/json",
            url:"/editSummary",
            data:JSON.stringify(data),
            success:function(data){
                if(data.success== true){
                    $("#writtenSummary").text($("#summary").val());
                    $("#modalForSummary").modal("hide")
                } else{
                    $("#modalForSummary").modal("hide")
                }
            },
            processData: false
            
        })
    });
    $("#updateSummaryFromModal").click(function(){
        
        var summary = $("#summary").val();
        console.log(summary);
        var data = {
            "summary":summary
        }
        $.ajax({
            
            type:"POST",
            contentType: "application/json",
            url:"/editSummary",
            data:JSON.stringify(data),
            success:function(data){
                if(data.success== true){
                    $("#writtenSummary").text($("#summary").val());
                    $("#modalForSummary").modal("hide")
                } else{
                    $("#modalForSummary").modal("hide")
                }
            },
            processData: false
            
        })
    });
    $(".editEd").click(function(){
        
        var id = $(this).attr("data-id");
        console.log(id);
        $('#modal-div').empty();
        $.ajax({
            
            type:"GET",
            contentType: "application/json",
            url:"/editEducation/"+id,
            
            success:function(data){
                console.log(data)
                $('#modal-div').html(data);
                buildDateSelector("#startyearForEd","#startmonthForEd");
        
                buildDateSelector("#endyearForEd","#endmonthForEd");
                //console.log($($("#startyearForEd").attr("data-start_year")))
                $("#startyearForEd").val($("#startyearForEd").attr("data-start_year"));
                $("#startmonthForEd").val($("#startmonthForEd").attr("data-start_month"));
                $("#endmonthForEd").val($("#endmonthForEd").attr("data-end_month"));
                $("#endyearForEd").val($("#endyearForEd").attr("data-end_year"));
              //  $('body').removeClass('modal-open');
//$('.modal-backdrop').remove();
                $("#typeEdOp").val("edit");
                $("#modalForEducation").modal({backdrop: 'static', keyboard: false}) //.modal("show");
            },
            processData: false
            
        })
    });
    
    $(".editWork").click(function(){
        
        
        var workId = $(this).attr("data-workid");
        $("#typeOp").val("edit")
        buildDateSelector("#startyear","#startmonth");
        
        buildDateSelector("#endyear","#endmonth");
        $("#startyear").val($("#startYear_"+workId).val());
        $("#startmonth").val($("#startMonth_"+workId).val());
        $("#endmonth").val($("#endMonth_"+workId).val());
        $("#endyear").val($("#endYear_"+workId).val());
        $("#job_title").val($("#jobTitle_"+workId).val());
        $("#company_name").val($("#companyName_"+workId).val());
        $("#company_state").val($("#state_"+workId).val());
        $("#company_country").val($("#country_"+workId).val());
        $("#summaryWork").text($("#summary_"+workId).val());
        $("#workID").val(workId);
        
        $("#modalForWork").modal();
       
    
    })
    $("#updateWorkFromModal").click(function(){
       
        console.log($("#workID").val())
        var data = {
            
            
            "data":{
            "work_id":$("#workID").val(),
            "start_month":$("#startmonth").val(),
            "end_month":$("#endmonth").val(),
            "start_year":$("#startyear").val(),
            "end_year":$("#endyear").val(),
            "job_title":$("#job_title").val(),
            "company_name":$("#company_name").val(),
            "summary":$("#summaryWork").val(),
            "state":$("#company_state").val(),
            "country":$("#company_country").val()
        }
        }
        
        $.ajax({
            
            type:"POST",
            contentType: "application/json",
            url:"/editWorkDetails/"+$("#typeOp").val(),
            data:JSON.stringify(data),
            success:function(data){
                if(data.success== true){
                    //$("#writtenSummary").text($("#summary").val());
                    $("#modalForWork").modal("hide")
                    window.reload();
                } else{
                    $("#modalForWork").modal("hide")
                }
            },
            processData: false
            
        })
        
        
    }) 
    $("#updateEducationFromModal").click(function(){
       
       // console.log($("#workID").val())
       var data ={
           data:$("#educationForm").serialize()
       }
        
       console.log(data)
//        $.ajax({
//            
//            type:"POST",
//            contentType: "application/json",
//            url:"/editEducationDetails/"+$("#typeEdOp").val(),
//            data: data,
//            success:function(data){
//                if(data.success== true){
//                    //$("#writtenSummary").text($("#summary").val());
//                    $("#modalForWork").modal("hide")
//                    window.reload();
//                } else{
//                    $("#modalForWork").modal("hide")
//                }
//            },
//            processData: false
//            
//        })
//        
        
    })
    function buildDateSelector(attribute1,attribute2){
        
        $(attribute1).empty();
        $(attribute2).empty();
        for (i = new Date().getFullYear() + 5; i > 1990; i--)
        {
            $(attribute1).append($('<option />').val(i).html(i));
        }
        var months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
         for (i = 0; i <months.length; i++)
        {
            $(attribute2).append($('<option />').val(months[i]).html(months[i]));
        }
    }
    
    $("#editSkills").click(function(){
      
        
        $("#editLinkedin").val($("#linkedinLink").text());
        $("#editGithub").val($("#githubLink").text());
        $("#editForSkills").val($("#skills").text());
        $("#modalForSkills").modal();
        
    })
    
    $("#updateSkillsFromModal").click(function(){
        
        var data = {
            data:{
            "skills":$("#editForSkills").val(),
            "github":$("#editGithub").val(),
            "linkedin":$("#editLinkedin").val()
        }
        };
        
        $.ajax({
            
            type:"POST",
            contentType: "application/json",
            url:"/editSkills",
            data:JSON.stringify(data),
            success:function(data){
                if(data.success== true){
                    //$("#writtenSummary").text($("#summary").val());
                    $("#modalForSkills").modal("hide")
                } else{
                    $("#modalForSkills").modal("hide")
                }
            },
            processData: false
            
        })
        
        
        
    })
    
    $("#addWork").click(function(){
        buildDateSelector("#startyear","#startmonth");
        
        buildDateSelector("#endyear","#endmonth");
        $("#typeOp").val("add");
        var timestamp = new Date().getUTCMilliseconds();
        $("#workID").val("work_"+timestamp);
        $("#job_title").empty();
        $("#company_name").empty();
        $("#summaryWork").empty();
        $("#workID").empty();
        
        $("#modalForWork").modal();
        
    })
});