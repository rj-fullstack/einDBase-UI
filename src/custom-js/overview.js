getMondayItems();

async function getUserInfo() {
    const response = await fetch('/.auth/me');
    const payload = await response.json();
    const { clientPrincipal } = payload;
    return clientPrincipal;
  }

function getMondayItems(){
    var getMondayItemUrl = 'https://fullstack-functions.azurewebsites.net/api/getMondayItems?code=jQ2ZgiXOu_fOcKh99epZL_H0tx52jJCQNEabt6xNI7eHAzFuMFeUDw==&getAllMondayItems=true'
    $.ajax({
        type: "GET",
        url: getMondayItemUrl,
        timeout: 60000,
    success: function(allMondayItems) {
        //console.log(allMondayItems)
        allMondayItems = JSON.parse(allMondayItems)
        addMondayTableHeaders(allMondayItems)
        //$("#preloader").css("display", "none");
        //goBacktoPRList();
    },
    error: function(err) {
        console.log(err)
        // $('#labelofNotif').html('<i class="fas fa-exclamation-circle"></i>&nbspERROR')
        // showPRAddSuccessNotif(JSON.stringify(err))
        // $("#preloader").css("display", "none");
    }
    });
}

function removeDuplicateArrayValues(arr) {
    return arr.filter((value, index) => (
      arr.indexOf(value) === index
    ));
  }

function addMondayTableHeaders(allMondayItems){
    var boardIdDropdown = ''
    var boardName = []
    for(var i=0; i<allMondayItems.length;i++){
        boardName.push(allMondayItems[i].BoardName)
    }
    var removeDuplicatesBoardName = removeDuplicateArrayValues(boardName).sort()

    for(var x=0;x<removeDuplicatesBoardName.length;x++){
        boardIdDropdown += `<li><a class="dropdown-item border-radius-md" onclick="getMondayBoardItems('${removeDuplicatesBoardName[x].trim()}')">${removeDuplicatesBoardName[x].trim()}</a></li>`
    }
    $('#mondayBoardSelect').append(boardIdDropdown);
    addMondayTableItems(allMondayItems)
}

function addMondayTableItems(allMondayItems){
    console.log(allMondayItems)
    $('#mondayItemRows').html('');
    var mondayItemRow = '';

    for(var y=0;y<30;y++){
        if(allMondayItems[y].People1 == null){
            allMondayItems[y].People1 = ''
        }
        if(allMondayItems[y].People2 == null){
            allMondayItems[y].People2 = ''
        }
        if(allMondayItems[y].People3 == null){
            allMondayItems[y].People3 = ''
        }
        if(allMondayItems[y].People4 == null){
            allMondayItems[y].People4 = ''
        }
        if(allMondayItems[y].People5 == null){
            allMondayItems[y].People5 = ''
        }


        if(allMondayItems[y].ColumnName1 == null){
            allMondayItems[y].ColumnName1 = ''
        }

        if(allMondayItems[y].ColumnName2 == null){
            allMondayItems[y].ColumnName2 = ''
        }

        if(allMondayItems[y].ColumnName3 == null){
            allMondayItems[y].ColumnName3 = ''
        }

        if(allMondayItems[y].ColumnName4 == null){
            allMondayItems[y].ColumnName4 = ''
        }

        if(allMondayItems[y].ColumnName5 == null){
            allMondayItems[y].ColumnName5 = ''
        }
        mondayItemRow += `
        <tr>
                      <td class="align-middle">
                      <span class="text-xs font-weight-bold">${allMondayItems[y].BoardName}</span>
                      </td>
                      <td class="align-middle">
                      <span class="text-xs font-weight-bold">${allMondayItems[y].Name}</span>
                      </td>

                      <td class="align-middle">
                        <span class="text-xs font-weight-bold">${allMondayItems[y].People1}</span>
                      </td>

                      <td class="align-middle">
                         <span class="text-xs font-weight-bold">${allMondayItems[y].ColumnName1}</span>
                      </td>

                      <td class="align-middle">
                         <span class="text-xs font-weight-bold">${allMondayItems[y].People2}</span>
                      </td>

                    <td class="align-middle">
                       <span class="text-xs font-weight-bold">${allMondayItems[y].ColumnName2}</span>
                    </td>

                    <td class="align-middle">
                       <span class="text-xs font-weight-bold">${allMondayItems[y].People3}</span>
                    </td>

                  <td class="align-middle">
                     <span class="text-xs font-weight-bold">${allMondayItems[y].ColumnName3}</span>
                  </td>

                  <td class="align-middle">
                     <span class="text-xs font-weight-bold">${allMondayItems[y].People4}</span>
                  </td>

                <td class="align-middle">
                   <span class="text-xs font-weight-bold">${allMondayItems[y].ColumnName4}</span>
                </td>

                <td class="align-middle">
                   <span class="text-xs font-weight-bold">${allMondayItems[y].People5}</span>
                </td>

              <td class="align-middle">
                <span class="text-xs font-weight-bold">${allMondayItems[y].ColumnName5}</span>
              </td>
        </tr>
        `

        $('#mondayItemRows').append(mondayItemRow);
    }
}

function getMondayBoardItems(boardName){
    
    var getMondayItemUrl = 'https://fullstack-functions.azurewebsites.net/api/getMondayItems?code=jQ2ZgiXOu_fOcKh99epZL_H0tx52jJCQNEabt6xNI7eHAzFuMFeUDw==&getItemonBoards='+encodeURIComponent(boardName)
    $.ajax({
        type: "GET",
        url: getMondayItemUrl,
        timeout: 60000,
    success: function(mondayBoardItems) {
        mondayBoardItems = JSON.parse(mondayBoardItems)
        addMondayTableItems(mondayBoardItems)
        //$('#dropdownTable').text(boardName)
        document.getElementById("dropdownTable").innerText = boardName
    },
    error: function(err) {
        console.log(err)
    }
    });
}